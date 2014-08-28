using System;
using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {    
        public static void RegisterBundles(BundleCollection bundles)
        {
#if !DEBUG 
            BundleTable.EnableOptimizations = true;
#endif
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/kendo/2014.1.416/kendo.common-bootstrap.min.css")
                .Include("~/Content/kendo/2014.1.416/kendo.bootstrap.min.css")
                //.Include("~/Content/kendo/2014.1.416/kendo.bootstrap.mobile.min.css")
                .Include("~/Content/bootstrap.css")
                .Include("~/Content/bootstrap-theme.css")
                //.Include("~/Content/themes/bootstrap-flatly.min.css")
                .Include("~/Content/font-awesome.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");

            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}