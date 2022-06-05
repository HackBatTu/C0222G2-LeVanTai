package service;

import model.Customer;

import java.util.List;

public interface ICustomerService {

    List<Customer> selectAll();

    void add(Customer customerList);

    void update(Customer customerList);

    void delete(int id);

    List<Customer> searchByName(String name);

    List<Customer> sortByName();
}