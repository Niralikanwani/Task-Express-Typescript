  
import * as shell from "shelljs";

shell.cp("-R", "src/public/js", "dist/public/js/");
shell.cp("-R", "src/public/css", "dist/public/css");
shell.cp("-R", "src/views", "dist/views");