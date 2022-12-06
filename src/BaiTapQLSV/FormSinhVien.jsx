import React, { Component } from "react";

export default class FormSinhVien extends Component {
  state = {
    values: {
      maSV: "",
      phone: "",
      name: "",
      email: "",
    },
    errors: {
      maSV: "",
      phone: "",
      name: "",
      email: "",
    },
    valid: false,
  };
  checkValid = () => {
    let { values, errors } = this.state;

    for (let key in errors) {
      if (errors[key] !== "" || values[key] === "") {
        return false;
      }
    }
    return true;
  };
  handleInputChange = (e) => {
    const { value, id } = e.target; //id ='price' value='1000'
    const type = e.target.getAttribute("data-type");

    let newValues = this.state.values;
    newValues[id] = value;

    let newErrors = this.state.errors;

    let messError = "";
    if (value.trim() === "") {
      messError = id + " cannot be blank !";
    } else {
      if (type === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messError = id + " must be numbers!";
        }
      }
      //
      if (type === "email") {
        let regexNumber = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regexNumber.test(value)) {
          messError = id + " is invalid !";
        }
      }
      if (type === "name") {
        let regexNumber =
          /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/;
        if (!regexNumber.test(value)) {
          messError = id + " must be letters!";
        }
      }
    }
    newErrors[id] = messError;

    this.setState(
      {
        values: newValues,
        errors: newErrors,
      },
      () => {
        let valid = this.checkValid();
        this.setState({
          valid: valid,
        });
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.checkValid()) {
      return;
    }

    const { getData } = this.props;
    getData(this.state.values);
  };

  reset = () => {
    this.setState({
      values: {
        maSV: "",
        phone: "",
        name: "",
        email: "",
      },
    });
  };

  handleCapNhat = (e) => {
    e.preventDefault();
    if (!this.checkValid()) {
      return;
    }
    const { capNhat } = this.props;
    capNhat(this.state.values);
  };



  render() {
    const { getData, editSv } = this.props;


    return (
      <div className="container mt-3">
        <form className="card" onSubmit={this.handleSubmit}>
          <div className="card-header text-primary">
            <h4>Thông tin sinh vien</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>Ma SV</p>
                  <input
                    className="form-control"
                    name="maSV"
                    id="maSV"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.maSV && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.maSV}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <p>So dien thoai</p>
                  <input
                    data-type="number"
                    className="form-control"
                    name="phone"
                    id="phone"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.phone && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Ho ten</p>
                  <input
                    data-type="name"
                    className="form-control"
                    name="name"
                    id="name"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.name && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <p>Email</p>
                  <input
                    data-type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.email && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary mr-5"
              type="submit"
              disabled={!this.state.valid}
            >
              Thêm người dùng
            </button>
            <button
              className="btn btn-danger mr-5"
              onClick={(e) => {
                this.handleCapNhat();
              }}
            >
              Cập nhật
            </button>
            <button
              className="btn btn-info"
              onClick={(e) => {
                this.reset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
