package casestudy.utils.file;

import casestudy.models.person.Customer;
import casestudy.models.person.Employee;
import casestudy.models.resort.Facility;
import casestudy.models.resort.House;
import casestudy.models.resort.Room;
import casestudy.models.resort.Villa;
import casestudy.models.service.Booking;
import casestudy.models.service.Contract;

import java.io.*;
import java.util.*;

public class ReadAndWriteBuffer {
    private static void writeToFile(String pathFile, List<String> list) {
        try {
            FileWriter fileWriter = new FileWriter(pathFile);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            String line = null;
            for (String s : list) {
                bufferedWriter.write(s);
                bufferedWriter.newLine();
            }
            bufferedWriter.close();
            fileWriter.close();
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
    public static void writeEmployee(String pathFile, List<Employee> employees) {
        List<String> list = new ArrayList<>();
        for (Employee e : employees) {
            list.add(e.convertLine());
        }
        writeToFile(pathFile, list);
    }

    public static void writeCustomer(String pathFile, List<Customer> customers) {
        List<String> list = new ArrayList<>();
        for (Customer c : customers) {
            list.add(c.convertLine());
        }
        writeToFile(pathFile, list);
    }

    public static void writeVilla(String pathFile, List<Villa> villas) {
        List<String> list = new ArrayList<>();
        for (Villa v : villas) {
            list.add(v.convertLine());
        }
        writeToFile(pathFile, list);
    }
    public static void writeHouse(String pathFile, List<House> houses) {
        List<String> list = new ArrayList<>();
        for (House h : houses) {
            list.add(h.convertLine());
        }
        writeToFile(pathFile, list);
    }
    public static void writeRoom(String pathFile, List<Room> rooms) {
        List<String> list = new ArrayList<>();
        for (Room r : rooms) {
            list.add(r.convertLine());
        }
        writeToFile(pathFile, list);
    }

    public static void writeBooking(String pathFile, Set<Booking> bookings) {
        List<String> list = new ArrayList<>();
        for (Booking b : bookings) {
            list.add(b.convertLine());
        }
        writeToFile(pathFile, list);
    }

    public static void writeContract(String pathFile, List<Contract> contracts) {
        List<String> list = new ArrayList<>();
        for (Contract c : contracts) {
            list.add(c.convertLine());
        }
        writeToFile(pathFile, list);
    }

    // hàm read dùng chung :
    public  static List<String> readFile(String pathFile){
        List<String> list= new ArrayList<>();
        File file = new File(pathFile);
        FileReader fileReader = null;
        BufferedReader bufferedReader = null;
        try {
            fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String line = null;
            while ((line = bufferedReader.readLine()) != null){
                list.add(line);
            }
            bufferedReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
    public static List<Employee> readEmployee(){
        List<String> list = readFile("src/casestudy/data/employee.csv");
        List<Employee> employeeList = new ArrayList<>();
        String[] arr = null;
        Employee employee = null;
        for (String str: list) {
            arr = str.split(",");
            employeeList.add(new Employee(Integer.parseInt(arr[0]),arr[1],arr[2],arr[3],Integer.parseInt(arr[4]),arr[5],arr[6],arr[7],arr[8],Integer.parseInt(arr[9])));
        }
       return employeeList;
    }
    public static List<Customer> readCustomer(){
        List<String> list = readFile("src/casestudy/data/customer.csv");
        List<Customer> customerList = new ArrayList<>();
        String[] arr = null;
        for (String str: list) {
            arr = str.split(",");
            customerList.add(new Customer(Integer.parseInt(arr[0]),arr[1],arr[2],arr[3],Integer.parseInt(arr[4]),arr[5],arr[6],arr[7],arr[8]) );
        }
        return customerList;
    }
    public static List<Villa> readVilla(){
        List<String> list = readFile("src/casestudy/data/villa.csv");
        List<Villa> villaList = new ArrayList<>();
        String[] arr = null;
        for(String str : list){
            arr = str.split(",");
            villaList.add(new Villa(arr[0],arr[1], Integer.parseInt(arr[2]),Integer.parseInt(arr[3]),Integer.parseInt(arr[4]),arr[5],arr[6],Integer.parseInt(arr[7]),Integer.parseInt(arr[8]) ));

        }
        return villaList;
    }
    public static List<House> readHouse(){
        List<String> list = readFile("src/casestudy/data/house.csv");
        List<House> houseList = new ArrayList<>();
        String[] arr = null;
        for(String str : list){
            arr = str.split(",");
            houseList.add(new House(arr[0],arr[1], Integer.parseInt(arr[2]),Integer.parseInt(arr[3]),Integer.parseInt(arr[4]),arr[5],arr[6],Integer.parseInt(arr[7]) ));
        }
        return houseList;
    }
    public static List<Room> readRoom(){
        List<String> list = readFile("src/casestudy/models/resort/Room.java");
        List<Room> roomList = new ArrayList<>();
        String[] arr = null;
        for(String str : list){
            arr = str.split(",");
            roomList.add(new Room(arr[0],arr[1], Integer.parseInt(arr[2]),Integer.parseInt(arr[3]),Integer.parseInt(arr[4]),arr[5],arr[6]));
        }
        return roomList;
    }
//    public static Set<Booking> readBooking(){
//        List<String> list = readFile("src/casestudy/models/service/Booking.java");
//        Set<Booking> bookingSet = new TreeSet<>();
//        String[] arr = null;
//        for(String str : list){
//            arr = str.split(",");
//            bookingSet.add(new Booking(Integer.parseInt(arr[0]),arr[1],arr[2],arr[3], arr[4]) );
//        }
//        return bookingSet;
//    }
//    public static List<Contract> readContract(){
//        List<String> list = readFile("src/casestudy/models/service/Booking.java");
//        List<Contract> contractList = new ArrayList<>();
//        String[] arr = null;
//        Booking booking = new Booking();
//        Customer customer = new Customer();
//        for(String str : list){
//            arr = str.split(",");
//            contractList.add(new Contract(arr[0],arr[1], arr[2],arr[3],arr[4]) );
//        }
//        return contractList;
//    }

}
