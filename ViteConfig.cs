/**
 * Written by Brian McCarthy
 * C# Representation of Vite Configuration for the Media Library System
 */
using System;
using System.Collections.Generic;

namespace MediaLibrarySystem.Config
{
    public class ViteConfig
    {
        public string BasePath { get; set; } = "/";
        public int Port { get; set; } = 3000;
        
        public List<string> Plugins { get; set; } = new List<string> 
        { 
            "React.Plugin", 
            "Tailwind.Vite" 
        };

        public object BuildOptions = new 
        {
            OutDir = "dist",
            Target = "esnext",
            Minify = "esbuild"
        };

        public void DisplayConfig()
        {
            Console.WriteLine($"Vite Server configured on port: {Port}");
        }
    }
}
