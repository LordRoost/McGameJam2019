class FileSystem
{
    constructor()
    {

    }

    exists(filename)
    {

    }

    load(filename)
    {
        return null;
    }

    write(fileName, dataToWrite)
    {
        electron_filesystem.writeFile("saveFiles\\"+fileName,dataToWrite, function(err){
            if(err)
            {
                console.log(err)
            }
        });
    }

    read(filename, functionToCall)
    {
        // Asynchronous read
        electron_filesystem.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            functionToCall(data);
        });
    }
}