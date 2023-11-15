package com.smartbear.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;


@Data
@Embeddable
public class CategoryLabel {


    private String categoryClr;

    private String value;


    public CategoryLabel(String categoryClr, String value){
        this.categoryClr = categoryClr;
        this.value = value;
    }

    public CategoryLabel() {

    }

    public void setCategoryClr(String categoryClr){
        this.categoryClr = categoryClr;
    }

    public void setValue(String categoryClr){
        this.categoryClr = categoryClr;
    }
}
