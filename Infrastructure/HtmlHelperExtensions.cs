using System;
using System.Collections.Generic;
using System.IO;
using System.Configuration;
using System.Runtime.Caching;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Web.Infrastructure
{
    public static class HtmlHelperExtensions
    {
        public static bool IsDebug(this HtmlHelper htmlHelper)
        {
#if DEBUG
            return true;
#else
            return false;
#endif
        }

        private const string MainJsBuildCacheKey = "_mainJsBuildKey";
        private const string MainJsBuildConfigKey = "MainJsBuildFilePath";
        private const string ScriptsVersionConfigKey = "ScriptsVersion";

        public static IHtmlString MainJavaScriptBuildContent(this HtmlHelper htmlHelper, string filePath = "~/App/build/main.js")
        {
            if (ConfigurationManager.AppSettings[MainJsBuildConfigKey] != null)
                filePath = ConfigurationManager.AppSettings[MainJsBuildConfigKey];
            filePath = HttpContext.Current.Server.MapPath(filePath);
            ObjectCache cache = MemoryCache.Default;
            var fileContents = cache[MainJsBuildCacheKey] as string;
            if (fileContents != null) return htmlHelper.Raw(fileContents);
            var policy = new CacheItemPolicy();
            policy.ChangeMonitors.Add(new HostFileChangeMonitor(new List<string> { filePath }));              
            fileContents = File.ReadAllText(filePath, new UTF8Encoding()).Replace("</script>", "</scr'+'ipt>");
            cache.Set(MainJsBuildCacheKey, fileContents, policy);
            return htmlHelper.Raw(fileContents);
        }

        public static string GetScriptsVersion(this HtmlHelper htmlHelper)
        {
            var scriptsVersion = ConfigurationManager.AppSettings[ScriptsVersionConfigKey];
            return scriptsVersion ?? "";
        }
    }
}