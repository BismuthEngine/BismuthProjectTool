import { resolve } from "path";

export default (args: string[]): Arguments  => {
    let result: Arguments = {
        Path: "",
        Target: "VSProj",
        Verbose: false
    }

    for(let i = 0; i < args.length; i++)
    {
        let argument = args[i];
        switch(argument)
        {
            case "--vsproj":
                result.Target = "VSProj";
                i++;
                argument = resolve(`${args[i]}`);
                result.Path = argument;
                break;
            case "-v":
                result.Verbose = true;
                break;
        }
    }

    return result;
}