namespace server.Exceptions;
public class RequestTimeout408Exception : Exception
{
    public RequestTimeout408Exception(string message) : base(message) { }
}