// Configuration

class Config { 
    public port = 3001; 
    // mysql database
    public mySQLhost = "localhost";
    public mySQLUser = "root";
    public mySQLPassword = "";
    public mySQLdb = "collage";
    //another database
}

const config = new Config();
export default config
