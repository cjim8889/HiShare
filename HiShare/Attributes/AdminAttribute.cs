using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Attributes
{
    public class AdminAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IConfiguration config;

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var config = (IConfiguration) context.HttpContext.RequestServices.GetService(typeof(IConfiguration));
            if (string.IsNullOrWhiteSpace(config.GetSection("Admin:Token").Value))
            {
                context.Result = new UnauthorizedResult();
            }

            string userProvidedToken = context.HttpContext.Request.Query["adminToken"].ToString();

            if (string.IsNullOrWhiteSpace(userProvidedToken))
            {
                context.Result = new UnauthorizedResult();
            }

            if (userProvidedToken != config.GetSection("Admin:Token").Value)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
