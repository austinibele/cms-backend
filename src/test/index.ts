import orm from "@modules/typeorm";
import cli from "cli";
import { MutexServer } from "mutex-server";
import { sleep_for } from "tstl/thread/global";

import api from "@ORGANIZATION/PROJECT-api";

import { Backend } from "../Backend";
import { Configuration } from "../Configuration";
import { SGlobal } from "../SGlobal";
import { SetupWizard } from "../setup/SetupWizard";
import { IUpdateController } from "../updator/internal/IUpdateController";
import { start_updator_master } from "../updator/internal/start_updator_master";
import { DynamicImportIterator } from "./internal/DynamicImportIterator";
import { StopWatch } from "./internal/StopWatch";

interface ICommand {
    mode?: string;
    skipReset?: string;
}

async function main(): Promise<void> {
    // SPECIALIZE MODE
    const command: ICommand = cli.parse();
    if (command.mode)
        SGlobal.setMode(command.mode.toUpperCase() as typeof SGlobal.mode);

    // PREPARE DATABASE
    const db: orm.Connection = await orm.createConnection(
        await Configuration.DB_CONFIG(),
    );
    if (command.skipReset === undefined) {
        await StopWatch.trace("Reset DB", () => SetupWizard.schema(db));
        await StopWatch.trace("Seed Data", () => SetupWizard.seed());
    }

    // UPDATOR SERVER
    const updator: MutexServer<string, IUpdateController | null> =
        await start_updator_master();

    // BACKEND SERVER
    const backend: Backend = new Backend();
    await backend.open();

    //----
    // CLINET CONNECTOR
    //----
    // DO TEST
    const connection: api.IConnection = {
        host: `http://127.0.0.1:${await Configuration.API_PORT()}`,
        encryption: await Configuration.ENCRYPTION_PASSWORD(),
    };
    const exceptions: Error[] = await DynamicImportIterator.force(
        __dirname + "/features",
        {
            prefix: "test",
            parameters: () => [connection],
        },
    );

    // WAIT FOR A WHILE FOR THE EVENTS
    await sleep_for(2500);

    // TERMINATE
    await backend.close();
    await db.close();
    await updator.close();

    if (exceptions.length === 0) console.log("Success");
    else {
        for (const exp of exceptions) console.log(exp);
        process.exit(-1);
    }
}
main().catch((exp) => {
    console.log(exp);
    process.exit(-1);
});
