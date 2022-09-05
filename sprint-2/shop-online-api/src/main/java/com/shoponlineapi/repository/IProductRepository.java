package com.shoponlineapi.repository;

import com.shoponlineapi.dto.IProductDTO;
import com.shoponlineapi.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select product.* from product join category on category.id = product.category_id where  " +
            " product.name like :searchByName and product.origin like :searchByOrigin and product.price " +
            " like :searchByPrice ",countQuery = "select count(*) from (select product.* from product  " +
            " join category on category.id = product.category_id where  product.name like :searchByName and  " +
            " product.origin like :searchByOrigin and product.price like :searchByPrice) temp_table",nativeQuery = true)
    Page<IProductDTO> getAllProduct(Pageable pageable, String searchByName, String searchByOrigin, String searchByPrice);

}
