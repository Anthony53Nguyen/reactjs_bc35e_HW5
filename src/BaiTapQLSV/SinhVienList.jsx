import React, { Component } from "react";


function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}

export default class SinhVienList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  handleSearch = (e) => {
    // let search = []
    // for (const sv of this.state.ds) {
    //   // remove dau va chuyen sang lowercase
    //   if (removeVietnameseTones(sv.name).toLowerCase().indexOf(removeVietnameseTones(e.target).toLowerCase()) !== -1) {
    //       search.push(sv)
    //   }
    // }
    // this.setState({
    //   danhSach: search
    // });
    this.setState({
      ...this.state,
      search: e.target.value
    })
  }


  render() {
    const { ds, chinhSua, xoaSV } = this.props;

    const filteredDs = ds.filter((sv) => {
      return sv.name.toLowerCase().includes(this.state.search)
    })
    return (
      <div className="container">
        <div className="row mb-3 mt-5">
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="search name"
                id="searchName ... "
                value={this.state.search}
                onInput={this.handleSearch}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="btnTimNV">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead className="text-primary">
            <tr>
              <th>Ma SV</th>
              <th>Ho ten</th>
              <th>So dien thoai</th>
              <th>Email</th>
              <th>
                <em className="fa fa-cog"></em>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDs.map((sv, index) => {
              return (
                <tr key={index}>
                  <td>{sv.maSV}</td>
                  <td>{sv.name}</td>
                  <td>{sv.phone}</td>
                  <td>{sv.email}</td>
                  <td>
                    <button className="btn btn-info" onClick={(e)=>{chinhSua(sv);}}>Chỉnh sửa</button>
                    <button className="btn btn-danger" onClick={(e)=>{xoaSV(sv.maSV);}}>Xóa</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <button id="btnDSSV" style="display: none;" type="button" class="btn btn-danger" onclick = "goDSSV()">Show DSNV</button> */}
      </div>
    );
  }
}

// getEle("searchName").addEventListener("keyup", function() {
//   var search = getEle("searchName").value;
//   var sameRank = new EmployeeList();

  
//   outPut(sameRank.arr);
//   getEle("btnDSSV").style.display = "block";
// });
