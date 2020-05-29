import React, { useState } from "react";
import classes from "./Form.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index"
import ViewCategory from "../../components/category/ViewCategory";

const ViewCategoryById = React.memo((props) => {
  const [data, setData] = useState({
    categoryId: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Enter category id to get information",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
  });

  const [categories, setCategories] = useState();

  const inputChangedHandler = (event, eventData) => {
    const updatedData = updateObject(data, {
      [eventData]: updateObject(data[eventData], {
        value: event.target.value,
        valid: checkValidity(event.target.value, data[eventData].validation),
        touched: true,
      }),
    });
    setData(updatedData);
  };

  const formElementsArray = [];
  for (let key in data) {
    formElementsArray.push({
      id: key,
      config: data[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  const submitHandler = (event) => {
    event.preventDefault();
    props.onCategoryViewHandler(data.categoryId.value)
    setCategories(props.categoriesById)
  };

//   if (loading) {
//     form = <Spinner />;
//   }

if(categories){
    return <ViewCategory passedCategories = {categories} />
}

  return (
    <div className={classes.FormData}>
      <h4>Create ViewCategoryById</h4>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit">Get Category</button>
      </form>
    </div>
  );
});

const mapStateToProps = (state) => {
    return {
      categoriesById : state.categoryById.categoriesById
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onCategoryViewHandler: (id) =>
        dispatch(actions.fetchCategoriesById(id)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(ViewCategoryById);
