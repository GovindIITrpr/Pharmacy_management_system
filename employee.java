import java.util.Scanner;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.FileOutputStream;
import java.sql.*;

public class employee {
    private static int employee_id;
    private static String name = "", date = "01-01-2024";
    private static clearCMD clear = new clearCMD();
    private static Statement db = null;

    private static Connection con = null;
    private static Scanner input = new Scanner(System.in);

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

    private static String refresh_serial_input() {
        System.out.println("0. Refresh");
        System.out.println("-1. back");
        String in = input.nextLine();
        if (in.equals("0")) {
            return "Refresh";
        }
        if (in.equals("-1")) {
            return "Back";
        }
        // boolean flag = true;
        try {
            Integer.parseInt(in);
        } catch (Exception e) {
            System.out.println("Invalid Input!");
            return "continue";
        }
        return in;
    }
    // =============================================================================================================================================

    private static String refresh_back_input() {
        System.out.println("0. Refresh");
        System.out.println("-1. Back");
        while (true) {
            String in = input.nextLine();
            if (in.equals("-1")) {
                return "Back";
            } else if (in.equals("0")) {
                return "Refresh";
            } else {
                System.out.println("Invalid Input!");
            }
        }
    }

    // =============================================================================================================================================

    private static void sales() throws SQLException {
        while (true) {
            String drug_name, C_name, type = "";
            System.out.println("At any time you want to exit process press -1");
            System.out.println("Warning!!! Pressing of any invalid key return back to you.");
            String code = "";
            String batch_no = "";
            String query = "";
            double selling_price;
            ResultSet res;

            while (true) {
                System.out.println("Enter code of drug");
                code = input.nextLine();

                if (code.equals("-1")) {
                    return;
                }
                System.out.println("Enter batch_no");
                batch_no = input.nextLine();
                if (batch_no.equals("-1") && batch_no == null) {
                    return;
                }

                query = "SELECT * FROM drug WHERE code = '" + code + "' and batch_no = '" + batch_no + "'";
                res = db.executeQuery(query);

                if (!res.next()) {
                    System.out.println("Drug is not available. Returning to last menu ...");
                    try {
                        Thread.sleep(3000); // Sleep for 5 seconds (5000 milliseconds)
                    } catch (InterruptedException e) {
                        e.printStackTrace(); // Handle the exception if needed
                    }
                    return;
                } else {
                    selling_price = res.getDouble("selling_price");
                    C_name = res.getString("company_name");
                    drug_name = res.getString("drug_name");
                    type = res.getString("type");
                    String query1 = "SELECT SUM(quantity) AS total_quantity FROM drug WHERE code = '" + code
                            + "' GROUP BY code";
                    ResultSet x = db.executeQuery(query1);

                    if (x.next()) {
                        int count = x.getInt("total_quantity");
                        System.out.println("Drug is available. Total available Quantity is " + count);
                    } else {
                        System.out.println("Error retrieving quantity information.");
                    }
                    break;
                }

            }

            String customer = "", date;
            int quantity;

            System.out.println("Enter quantity");
            String s2 = input.nextLine();
            quantity = Integer.parseInt(s2);
            System.out.println("Quantity " + quantity);
            if (quantity == -1) {
                return;
            }

            System.out.println("Enter date");
            date = input.nextLine();
            if (date.equals("-1")) {
                return;
            }

            System.out.println("Enter customer full name");
            customer = input.nextLine();
            if (customer.equals("-1")) {
                return;
            }

            double price = quantity * selling_price;
            query = "INSERT INTO sales (company_name, drug_name, type, code, batch_no, selling_price, quantity, date, price, customer, employee_id) VALUES('"
                    + C_name + "','" + drug_name + "','" + type + "','" + code + "','" + batch_no + "','"
                    + selling_price + "','" + quantity + "','" + date + "','"
                    + price + "','" + customer + "','"
                    + employee_id + "')";
            try {
                int x = db.executeUpdate(query);
                con.commit();
                if (x == 1) {
                    System.out.println("Drug information added to sales successfully.");
                } else {
                    System.out.println("Error adding drug information to sales.");
                }
            } catch (SQLException e) {
                // Handle the specific exception for an expired employee license
                if (e.getMessage().contains("Employee license expired")) {
                    System.out.println("Employee license expired. Returning to the last menu ...");
                    try {
                        Thread.sleep(3000); // Sleep for 3 seconds
                    } catch (InterruptedException interruptedException) {
                        interruptedException.printStackTrace(); // Handle the exception if needed
                    }
                    break;
                } else {
                    // Handle other exceptions
                    e.printStackTrace();
                    System.out.println("An error occurred. Returning to the last menu ...");
                    try {
                        Thread.sleep(3000); // Sleep for 3 seconds
                    } catch (InterruptedException interruptedException) {
                        interruptedException.printStackTrace(); // Handle the exception if needed
                    }
                    break;
                }
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
    // =============================================================================================================================================

    private static void receipt() throws SQLException {
        while (true) {
            String query = "SELECT * FROM employee WHERE employee_id = '" + employee_id + "'";
            ResultSet resultSet = db.executeQuery(query);

            String employee = null;
            Timestamp licence = Timestamp.valueOf("2023-12-12 00:00:00");

            if (resultSet.next()) {
                employee = resultSet.getString("name");
                licence = resultSet.getTimestamp("valid_upto");
            }
            System.out.println(licence);
            System.out.println("At any time you want to exit the process, press -1");
            System.out.println("Enter the name of the customer:");
            name = input.nextLine();
            if (name.equals("-1")) {
                return;
            }

            String date;
            System.out.println("Enter the date:");
            date = input.nextLine();
            if (date.equals("-1")) {
                return;
            }

            double discount_rate;
            System.out.println("Enter discount rate in %:");
            while (true) {
                try {
                    discount_rate = Double.parseDouble(input.nextLine());
                    break;
                } catch (NumberFormatException e) {
                    System.out.println("Invalid input. Please enter a valid number.");
                }
            }

            if (discount_rate == -1) {
                return;
            }

            LocalDateTime currentDate = LocalDateTime.now();

            try {
                query = "SELECT * FROM sales WHERE customer = '" + name + "' and date = '" + date + "'";
                ResultSet rs1 = db.executeQuery(query);
                System.out.println("Date: " + date);
                System.out.println("Name: " + name);
                System.out.println("Issuer name (employee name): " + employee);
                System.out.println("");
                System.out.println("CompanyName \t\t\t code \t\t\t\t Selling Price \t\t\t\t\t units \t\t\t\t\t Price");
                double Z = 0;

                while (rs1.next()) {
                    String company_name = rs1.getString("company_name");
                    String code = rs1.getString("code");
                    double sellP = rs1.getDouble("selling_price");
                    int k = rs1.getInt("quantity");
                    double price = rs1.getDouble("price");
                    Z = Z + price;
                    System.out.println(company_name + "\t\t\t\t" + code + "\t\t\t\t\t" + sellP + "\t\t\t\t\t" + k
                            + "\t\t\t\t\t" + price + " rs.");
                }
                double discount = (Z * discount_rate) / 100;
                double payableAmount = Z - discount;
                // Display total, discount, and payable amount
                System.out.println("-------------------------------");
                System.out.print("Total" + "\t\t\t\t\t");
                System.out.println(Z + " rs.");
                System.out.print("Discount" + "\t\t\t\t\t");
                System.out.println(discount + " rs.");
                System.out.print("Payable amount" + "\t\t\t\t\t");
                System.out.println(payableAmount + " rs.");

                System.out.println("1. Make another receipt for another user");
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
            } catch (SQLException e) {
                // Exception handling code
                System.out.println(
                        "Your license for issuing the medicine is expired. Log out and contact administration.");
                try {
                    Thread.sleep(3000); // Sleep for 3 seconds (10000 milliseconds)
                } catch (InterruptedException e1) {
                    e1.printStackTrace(); // Handle the exception if needed
                }
                return;
            }
        }
    }

    // ============================================================================================================================================

    public static void start() throws SQLException {

        authentication a = new authentication();
        String s[] = a.login(2);
        if (s[0].equals("-1")) {
            return;
        } else {
            employee_id = Integer.parseInt(s[1]);
        }
        connect c = new connect();
        db = c.pgstart();

        con = c.con();
        String q = "Select * from employee where employee_id = '" + employee_id + "';";
        ResultSet r = db.executeQuery(q);
        r.next();
        name = r.getString("name");
        while (true) {
            clear.clearConsole();
            System.out.println("Login as a Employee, Welcome : " + name);
            System.out.println("Home Dashboard!");
            System.out.println("1. issue the drug ");
            System.out.println("2. make the receipt for user ");
            System.out.println("3. Log out ");
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
                    continue;
                }
            }
            if (x == 1) {
                clear.clearConsole();
                sales();
                clear.clearConsole();
            } else if (x == 2) {
                clear.clearConsole();
                receipt();
                clear.clearConsole();
            } else {
                return;
            }
        }
    }
}