package com.shoponlineapi.service;

import com.shoponlineapi.dto.ErrorDTO;
import com.shoponlineapi.dto.PaymentDto;
import com.shoponlineapi.model.Customer;
import com.shoponlineapi.model.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    ErrorDTO saveOrder(OrderService productOrder);

    List<OrderService> getProductInCardByCustomer(Customer customer);

    Boolean minusQuantity(OrderService orderService);

    Boolean plusQuantity(OrderService orderService);

    Boolean findProductOrder(OrderService orderService);

    PaymentDto goPayment(Customer customer);


    Page<OrderService> findAll(Pageable pageable);

    Page<OrderService> getListOrderYesterday(Pageable pageable);

    Page<OrderService> getOrderInCustomer(Pageable pageable, Customer customer);
}
