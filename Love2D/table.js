class Table
{
    constructor()
    {

    }

    insert(tableObject, objToInsert)
    {
        tableObject.push(objToInsert);
    }

    remove(tableObject, index)
    {
        tableObject.splice(index,1);
    }
}