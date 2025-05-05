namespace BLL.DTOs
{
    public class PaymentResultDto
    {
        private string id;
        private string clientSecret;

        public PaymentResultDto(string id, string clientSecret)
        {
            this.Id = id;
            this.ClientSecret = clientSecret;
        }

        public string Id { get => id; set => id = value; }
        public string ClientSecret { get => clientSecret; set => clientSecret = value; }
    }
}