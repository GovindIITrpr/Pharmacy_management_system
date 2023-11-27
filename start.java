import java.io.*;
import java.sql.SQLException;
import java.util.Scanner;

public class mini {
    private static Scanner input = new Scanner(System.in);

    public static void main(String[] args) throws IOException, SQLException {

        clearCMD clear = new clearCMD();
        clear.clearConsole();
        System.out.println("Welcome! to My Database project");
        while (true) {
            // clear.clearConsole();
            System.out.println("Log in as!");
            System.out.println("1. Admin");
            System.out.println("2. Employee");
            System.out.println("-1. Exit");
            String in = input.nextLine();
            int x = 0;
            try {
                x = Integer.parseInt(in);
            } catch (Exception e) {
                System.out.println("Invalid Input");

                continue;
            }

            if (x == -1) {
                break;
            } else if (x == 1) {
                admin f = new admin();
                f.start();

                clear.clearConsole();
            } else if (x == 2) {
                employee s = new employee();
                s.start();

                clear.clearConsole();
            } else {
                System.out.println("Invalid Input");
            }
        }
        return;
    }
}