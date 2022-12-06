import React, { Component } from "react";
import FormSinhVien from "./FormSinhVien";
import SinhVienList from "./SinhVienList";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dssv: [],
      obj: {}
    };
  }
// Search
  searchSV = (id) => {
    var index = -1;
    this.state.dssv.forEach(function (sv, i) {
      if (sv.maSV === id) {
        index = i;
      }
    });
    return index;
  };

  // Add
  addSV = (sv) => {
    var index = this.searchSV(sv.maSV);
    if (index === -1) {
      const newSV = {
        ...sv,
      };
      this.state.dssv.push(newSV);
      this.setState({
      });
    } else {
      window.alert("Error.  Trùng mã sinh viên");
    }
  };

// Delete
  delSV = (id) => {
      var index = this.searchSV(id);
      this.state.dssv.splice(index, 1)
      this.setState({
        });
  };

  infoSV = (sv) => {
    // var index = this.searchSV(id);
    this.setState({
      ...this.state,
      obj: sv,
    });
    console.log(sv)
  };

  suaTT = (sv) => {
      const newSV = {
        ...sv,
      };
      this.delSV(sv.maSV);
      this.addSV(newSV)
  };



  componentDidMount() {
    // Get local storage
    if (localStorage.getItem("SinhVien List")) {
      var dataString = localStorage.getItem("SinhVien List");
      // convert string to jason
      this.setState({
        dssv: JSON.parse(dataString),
      });
    }
  }
  componentWillUnmount() {
    // Set local storage
    var dataString = JSON.stringify(this.state.dssv);
    localStorage.setItem("SinhVien List", dataString);
  }

  render() {
    return (
      <div>
        <FormSinhVien editSv={this.state.obj} getData={this.addSV} capNhat = {this.suaTT}/>
        <SinhVienList ds={this.state.dssv} chinhSua={this.infoSV} xoaSV={this.delSV} />
      </div>
    );
  }
}
