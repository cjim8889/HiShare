using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace HiShare.Services
{
    public class RecaptchaService
    {
        public class RequestDTO
        {
            public string Secret { get; set; }
            public string Response { get; set; }
        }
        public class ResponseDTO
        {
            public bool Success { get; set; }
            public DateTime Challenge_ts { get; set; }
            public string Hostname { get; set; }

            [DataMember(Name = "error-codes")]
            public List<string> ErrorCodes { get; set; }
        }

        private readonly string secretKey;
        private readonly string url;
        private readonly HttpClient client;
        public RecaptchaService(IConfiguration configuration)
        {
            secretKey = configuration.GetSection("Recaptcha_SecretKey").Value;
            url = configuration.GetSection("Recaptcha:Url").Value;
            client = new HttpClient();
        }

        private RequestDTO NewRequest(string response)
        {
            return new RequestDTO() { Secret = secretKey, Response = response };
        }

        public async Task<bool> Authenticate(string response)
        {
            var request = NewRequest(response);
            var res = await SendAuthenticateRequestAsync(request);

            return res.Success;
        }

        private async Task<ResponseDTO> SendAuthenticateRequestAsync(RequestDTO request)
        {
            var formData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", request.Secret),
                new KeyValuePair<string, string>("response", request.Response)
            });

            var response = await client.PostAsync(url, formData);
            var responseStr = await response.Content.ReadAsStringAsync();

            var responseObj = JsonConvert.DeserializeObject<ResponseDTO>(responseStr);

            return responseObj;
        }
    }
}
