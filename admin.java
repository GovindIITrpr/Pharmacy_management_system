import com.sun.source.tree.WhileLoopTree;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Scanner;

public class admin {
    private static String username = "";
    private static Scanner input = new Scanner(System.in);
    private static Statement db = null;
    private static Connection con = null;
    private static final clearCMD clear = new clearCMD();

    private static String int_input() {
        while (true) {
            String in = input.nextLine();
            if (in.equals("-1")) {
                return "Back";
            }
            try {
                Integer.parseInt(in);

                return in;
            } catch (Exception e) {
                System.out.println("Invalid Input");
            }
        }
    }

    private static void back_input() {
        System.out.println("-1. Back");
        while (true) {
            String in = input.nextLine();
            if (in.equals("-1")) {
                return;
            } else {
                System.out.println("Invalid Input!");
            }
        }
    }

    private static boolean isValidDateFormat(String dateStr, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        sdf.setLenient(false); // This makes the date validation strict

        try {
            // Parse the date. If successful, the format is correct.
            Date date = sdf.parse(dateStr);
            return true;
        } catch (ParseException e) {
            // ParseException will be thrown if the format is incorrect.
            return false;
        }
    }

    private static void AddEmployees() throws SQLException {
        while (true) {
            String name;
            System.out.println("At any time you want to exit process press -1");
            System.out.println("Enter name of the Employee");
            name = input.nextLine();
            if (name.equals("-1")) {
                return;
            }
            int employee_id;
            String query = "";
            ResultSet res;
            String valid_upto = "";
            while (true) {
                System.out.println("Enter Employee ID of Candidate");
                String eId = input.nextLine();
                employee_id = Integer.parseInt(eId);
                if (employee_id == -1) {
                    return;
                }
                query = "select * from employee where employee_id = '" + employee_id + "' ";
                res = db.executeQuery(query);
                res.next();
                if (res.getRow() == 0) {
                    break;
                } else {
                    System.out.println(
                            "This Employee ID is already assigned to other employee. if you want to update the Licence validation then ");
                    System.out.println("Enter new last date of licence for update licence validation or press -1:");
                    valid_upto = input.nextLine();
                    if (valid_upto.equals("-1")) {
                        return;
                    } else {
                        query = "UPDATE employee SET valid_upto = '" + valid_upto + "' WHERE employee_id = '"
                                + employee_id + "'";
                        return;
                    }
                }
            }

            String phone = "", email = "", dob = "", address = "", password = "";
            System.out.println("Enter Last date of Licence format ( dd-mm-yyyy ) :");
            valid_upto = input.nextLine();
            while (true) {
                if (valid_upto.equals("-1")) {
                    return;
                }
                if (isValidDateFormat(valid_upto, "dd-MM-yyyy")) {
                    break;
                } else {
                    System.out.println("Enter Last date of Licence in correct format ( dd-mm-yyyy ) :");
                }
            }
            System.out.println("Enter Email");
            email = input.nextLine();
            if (email.equals("-1")) {
                return;
            }
            System.out.println("Enter Date of Birth");
            dob = input.nextLine();
            if (dob.equals("-1")) {
                return;
            }
            System.out.println("Enter Address");
            address = input.nextLine();
            if (address.equals("-1")) {
                return;
            }
            System.out.println("Enter Phone Number");
            phone = input.nextLine();
            if (phone.equals("-1")) {
                return;
            }
            System.out.println("Enter Password");
            password = input.nextLine();
            if (phone.equals("-1")) {
                return;
            }
            query = "INSERT INTO employee(employee_id,name,valid_upto,dob,address,phone,email,password) VALUES('"
                    + employee_id + "','" + name + "','" + valid_upto + "','" + dob + "','" + address + "','" + phone
                    + "','" + email + "','" + password + "') ;";
            int x = db.executeUpdate(query);

            if (x == 1) {
                con.commit();
                System.out.println("Successfully Added");
            } else {
                System.out.println("Insertion fail Contact Administration x = " + x);
            }

            System.out.println("1. Add Another Employee");
            System.out.println("-1. Back");
            String in = input.nextLine();
            while (true) {
                if (in.equals("1")) {
                    clear.clearConsole();
                    break;
                } else if (in.equals("-1")) {
                    return;
                } else {
                    System.out.println("Invalid Input");
                }
            }
        }
    }

    private static void AddDrugs() throws SQLException {
        while (true) {
            String C_name, type = "";
            System.out.println("At any time you want to exit process press -1");
            System.out.println("Enter company name");
            C_name = input.nextLine();
            if (C_name.equals("-1")) {
                return;
            }
            String name;
            System.out.println("Enter name of the drug");
            name = input.nextLine();
            if (name.equals("-1")) {
                return;
            }
            System.out.println("Enter type");
            type = input.nextLine();
            if (type.equals("-1")) {
                return;
            }
            String code = "", batch_no = "";
            String query = "";
            ResultSet res;
            while (true) {
                System.out.println("Enter code");
                code = input.nextLine();
                if (code.equals("-1")) {
                    return;
                }
                System.out.println("Enter batch Number");
                batch_no = input.nextLine();
                if (batch_no.equals("-1")) {
                    return;
                }
                query = "select * from drug where code = '" + code + "' and batch_no = '" + batch_no + "' ";
                res = db.executeQuery(query);
                res.next();
                if (res.getRow() == 0) {
                    break;
                } else {
                    System.out.println("This drug is available so quantity will add in already available row.");
                    System.out.println("Enter the adding quantity ");
                    int adding_quantity = input.nextInt();
                    int new_quantity = adding_quantity + res.getInt("quantity");

                    query = "UPDATE drug SET quantity = " + new_quantity + " WHERE code = '" + code
                            + "' AND batch_no = '" + batch_no + "'";
                    int x = db.executeUpdate(query);

                    if (x == 1) {
                        con.commit();
                        System.out.println("Successfully Added");
                        return;
                    } else {
                        System.out.println("Insertion fail Contact Administration x = " + x);
                    }
                }
            }

            String drug_name = name, chemical_name = "", expiry_date = "", selling_price, quantity;

            System.out.println("Enter selling Price");
            selling_price = input.nextLine();

            if (selling_price.equals("-1")) {
                return;
            }

            System.out.println("Enter Expiry Date");
            expiry_date = input.nextLine();
            if (expiry_date.equals("-1")) {
                return;
            }
            System.out.println("Enter quantity");
            quantity = input.nextLine();
            ;
            if (quantity.equals("-1")) {
                return;
            }
            double sellingP = Double.parseDouble(selling_price);
            int count = Integer.parseInt(quantity);
            query = "INSERT INTO drug(company_name, drug_name, type, code, selling_price, expiry, quantity, batch_no) VALUES('"
                    + C_name + "','" + drug_name + "','" + type + "','" + code + "','"
                    + sellingP + "','" + expiry_date + "', '" + count
                    + "','" + batch_no + "')";
            int x = db.executeUpdate(query);

            if (x == 1) {
                con.commit();
                System.out.println("Successfully Added");
            } else {
                System.out.println("Insertion fail Contact Administration x = " + x);
            }

            System.out.println("1. Add Another drug data");
            System.out.println("-1. Back");
            String in = input.nextLine();
            while (true) {
                if (in.equals("1")) {
                    clear.clearConsole();
                    break;
                } else if (in.equals("-1")) {
                    return;
                } else {
                    System.out.println("Invalid Input");
                }
            }
        }
    }

    public static void start() throws SQLException {

        authentication a = new authentication();
        String s[] = a.login(1);
        if (s[0].equals("-1")) {
            return;
        } else {
            username = s[1];
        }

        connect c = new connect();
        db = c.pgstart();
        con = c.con();
        String q = "select * from admin where name = '" + username + "';";
        ResultSet r = db.executeQuery(q);
        r.last();
        Boolean access = false;
        if (r.getRow() == 0) {
            access = false;
        } else {
            access = true;
        }

        while (true) {
            clear.clearConsole();
            System.out.println("Login as a Admin, Welcome :" + username);
            System.out.println("Home Dashboard!");
            System.out.println("1. Add / update a Employee ");
            System.out.println("2. Add a Drug");
            System.out.println("3. Log out");

            String in = "";
            int x = 0;
            while (true) {
                in = input.nextLine();

                try {
                    x = Integer.parseInt(in);

                } catch (Exception e) {
                    System.out.println("Invalid Input");
                    continue;
                }
                if (x >= 1 && x <= 3) {
                    break;
                } else {
                    System.out.println("Invalid Input");
                }
            }
            if (x == 1) {
                clear.clearConsole();
                AddEmployees();
                clear.clearConsole();
            } else if (x == 2) {
                clear.clearConsole();
                AddDrugs();
                clear.clearConsole();
            } else {
                return;
            }
        }
    }
}
