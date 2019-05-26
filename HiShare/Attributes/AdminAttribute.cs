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
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var config = (IConfiguration) context.HttpContext.RequestServices.GetService(typeof(IConfiguration));
            var adminToken = config.GetSection("Admin_Token").Value;
            if (string.IsNullOrWhiteSpace(adminToken))
            {
                context.Result = new UnauthorizedResult();
            }

            string userProvidedToken = context.HttpContext.Request.Query["adminToken"].ToString();

            if (string.IsNullOrWhiteSpace(userProvidedToken))
            {
                context.Result = new UnauthorizedResult();
            }

            if (userProvidedToken != adminToken)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
