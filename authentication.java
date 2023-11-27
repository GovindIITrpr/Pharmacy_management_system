import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class authentication {
    static String approve = "1";
    static String back = "-1";
    static Scanner input = new Scanner(System.in);

    public static String[] login(int usertype) throws SQLException {
        connect c = new connect();
        Statement db = c.pgstart();
        ResultSet res = null;

        clearCMD clear = new clearCMD();

        clear.clearConsole();

        String passWord = "";
        int Id;
        String query = "";
        String[] s = new String[2];

        while (true) {
            String p = "Logging As a ";
            if (usertype == 1) {
                p = p + "Admin";
                System.out.println(p);
                System.out.println("Press -1 for goes back!");
                System.out.println("Please Enter Your admin id");
            } else if (usertype == 2) {
                p = p + "Employee";
                System.out.println(p);
                System.out.println("Press -1 for goes back!");
                System.out.println("Please Enter Your Employee Id");
            }

            System.out.print("Id: ");
            Id = input.nextInt();

            if (Id == -1) {
                s[0] = back;

                break;
            }
            if (usertype == 1) {
                System.out.println(p);
                query = "select * from admin where id = '" + Id + "'";
            } else if (usertype == 2) {
                System.out.println(p);
                query = "select * from employee where employee_id = '" + Id + "' ";
            }

            res = db.executeQuery(query);
            res.next();
            if (res.getRow() == 1) {
                clear.clearConsole();
                System.out.println("Id: " + Id);
                System.out.println("Please Enter Your Password");

                while (true) {
                    System.out.print("Password: ");
                    String password = input.nextLine();
                    if (password.equals("-1")) {
                        s[0] = back;
                        clear.clearConsole();
                        return s;
                    }
                    if (password.equals(res.getString("password"))) {
                        s[0] = approve;
                        s[1] = "" + Id;
                        clear.clearConsole();

                        return s;
                    } else {
                        System.out.println("Wrong Password");
                    }

                }
            } else {
                clear.clearConsole();
                System.out.println("There is no user with username " + Id);
                continue;
            }
        }
        c.pgend();
        clear.clearConsole();
        return s;

    }
}
