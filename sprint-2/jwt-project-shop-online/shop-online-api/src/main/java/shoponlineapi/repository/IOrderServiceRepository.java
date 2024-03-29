package shoponlineapi.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import shoponlineapi.dto.CustomerTopDTO;
import shoponlineapi.dto.StatisticDTO;
import shoponlineapi.enlity.Customer;
import shoponlineapi.enlity.OrderService;

import java.util.List;

public interface IOrderServiceRepository extends JpaRepository<OrderService, Integer> {
    @Query(value = " select po.* from order_service po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#productOrder.customer.id} and po.product_id = :#{#productOrder.product.id} and po.bill_id is null ", nativeQuery = true)
    OrderService findProductOrderListByCustomerAndProduct(OrderService productOrder);

    @Query(value = " select po.* from order_service po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " where po.customer_id = :#{#customer.id} and bill_id is null ", nativeQuery = true)
    List<OrderService> getProductInCardByCustomer(Customer customer);

    @Modifying
    @Transactional
    @Query(value = " UPDATE `order_service` SET `bill_id` = :billId WHERE (`customer_id` = :customerId) and `bill_id` is null ", nativeQuery = true)
    void setBill(@Param("customerId") Integer customerId, @Param("billId") Integer billId);


    @Query(value = " select po.* from order_service po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " join bill b on b.id = po.bill_id " +
            " where po.is_deleted = 0 order by b.creation_date desc ",
            countQuery = "select count(*) from ( select po.* from order_service po " +
            "           join customer c on c.id = po.customer_id " +
            "            join product p on p.id = po.product_id " +
            "            join bill b on b.id = po.bill_id  " +
            "            where po.is_deleted = 0  order by b.creation_date desc) temp_table",nativeQuery = true)
    Page<OrderService> findAllOrder(Pageable pageable);

    @Query(value = "select po.* from order_service po " +
            "join customer c on c.id = po.customer_id " +
            "join product p on p.id = po.product_id " +
            "join bill b on b.id = po.bill_id " +
            "where po.is_deleted = 0 " +
            " and b.creation_date  >= current_date - interval 1 day and b.creation_date < current_date  order by b.creation_date desc",
            countQuery = "select count(*) from (select po.* from order_service po " +
                    "     join customer c on c.id = po.customer_id " +
                    "     join product p on p.id = po.product_id " +
                    "     join bill b on b.id = po.bill_id " +
                    "     where po.is_deleted = 0 " +
                    "     and b.creation_date  >= current_date - interval 1 day and b.creation_date < current_date " +
                    " order by b.creation_date desc) temp_table",nativeQuery = true)
    Page<OrderService> getListOrderYesterday(Pageable pageable);

    @Query(value = " select po.* from order_service po " +
            " join customer c on c.id = po.customer_id " +
            " join product p on p.id = po.product_id " +
            " join bill b on b.id = po.bill_id " +
            " where po.customer_id = :#{#customer.id} and po.is_deleted = 0 order by b.creation_date desc ",
            countQuery = "select count(*) from (  select po.* from order_service po " +
                    "           join customer c on c.id = po.customer_id " +
                    "          join product p on p.id = po.product_id " +
                    "           join bill b on b.id = po.bill_id " +
                    "            where po.customer_id = :#{#customer.id} and po.is_deleted = 0 " +
                    " order by b.creation_date desc) temp_table",nativeQuery = true)
    Page<OrderService> getOrderInCustomer(Pageable pageable,Customer customer);

    @Query(value = "select os.* from order_service os " +
            " join product p on p.id = os.product_id " +
            " join customer c on c.id = os.customer_id " +
            " join bill b on b.id = os.bill_id " +
            " where b.id = :id and os.is_deleted = 0 ",
            nativeQuery = true)
    List<OrderService> findProductById( Integer id);

    @Query(value = "select sum(os.quantity) as quantity , p.name as name , b.creation_date as creationDate from order_service os " +
            " join product p on os.product_id = p.id " +
            " join customer c on os.customer_id = c.id " +
            " join bill b on os.bill_id = b.id " +
            " group by os.product_id " +
            " having b.creation_date  >= current_date - interval 7 day AND b.creation_date <  current_date - interval 1 day " +
            " order by sum(os.quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticDTO> getWeekStatistic();

    @Query(value = "select sum(os.quantity) as quantity , p.name as name , b.creation_date as creationDate from order_service os " +
            " join product p on os.product_id = p.id " +
            " join customer c on os.customer_id = c.id " +
            " join bill b on os.bill_id = b.id " +
            " group by os.product_id " +
            " having b.creation_date  >= current_date - interval 30 day AND b.creation_date <  current_date - interval 1 day " +
            " order by sum(os.quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticDTO> getMonthStatistic();

    @Query(value = "select sum(os.quantity) as quantity ,  p.name as name , b.creation_date as creationDate from order_service os " +
            " join product p on os.product_id = p.id " +
            " join customer c on os.customer_id = c.id " +
            " join bill b on os.bill_id = b.id " +
            " group by os.product_id " +
            " having b.creation_date  >= current_date - interval 365 day AND b.creation_date <  current_date - interval 1 day " +
            " order by sum(os.quantity) desc " +
            " limit 10 ", nativeQuery = true)
    List<StatisticDTO> getYearStatistic();

    @Query(value = "select sum(os.quantity) as quantity , c.* ,ass.user_name as userName from order_service os " +
            " join product p on os.product_id = p.id " +
            " join customer c on os.customer_id = c.id " +
            " join bill b on os.bill_id = b.id " +
            " join app_user ass on c.user_id = ass.id " +
            "group by os.customer_id " +
            "order by sum(os.quantity) desc " +
            "limit 10 ",nativeQuery = true)
    List<CustomerTopDTO> getTopCustomer();
}
