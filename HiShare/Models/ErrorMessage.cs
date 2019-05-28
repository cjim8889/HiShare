using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HiShare.Models
{
    public class ErrorCode
    {
        public static string EmptyTitle = "EmptyTitle";
    }
    public class ErrorMessage
    {
        public ErrorCode ErrorCode { get; set; }
    }
}
