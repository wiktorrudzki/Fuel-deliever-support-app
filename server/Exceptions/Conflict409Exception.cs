namespace server.Exceptions;
public class Conflict409Exception : Exception
{
    public Conflict409Exception(string message) : base(message) { }
}