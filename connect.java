import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.*;
public class connect {
    Connection connect = null;
    Statement st = null;


    public Statement pgstart() {

        try {
            Class.forName("org.postgresql.Driver");
            connect = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Pharmacy","postgres", "Gs12345@");
            if(connect==null)
            {
                System.out.println("Connection Failed!");
            }
            connect.setAutoCommit(false);
            st = connect.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }
        return st;
    }
    public Connection con(){
        return connect;
    }
    public void pgend(){
        try {
            connect.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
