namespace server.Exceptions
{
    public class InternalServerError500Exception :Exception
    {
        public InternalServerError500Exception(string message) : base(message) { }
    }
}
