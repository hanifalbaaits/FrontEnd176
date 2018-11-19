import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import apiconfig from "../../../config/api.config.json";

import { connect } from "react-redux";
import { createUser } from "../../../actions/userActions";
// import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        username: "",
        password: "",
        repassword: "",
        m_employee_id: "",
        created_by: userdata.username
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      },
      formdata: tmp
    });
  }

  validatePassword(password) {
    let regex = new RegExp(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
    );
    return regex.test(String(password));
    /*At least one lC,Up,Number,[@#$%],6-20*/
  }

  submitHandler() {
    if (
      this.state.formdata.username === "" ||
      this.state.formdata.password === "" ||
      this.state.formdata.repassword === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else if (this.validatePassword(this.state.formdata.password) === false) {
      this.setState({
        alertData: {
          status: true,
          message:
            "Password Easy (at least one character lowercase, uppercase, number, symbol, 8+ character)"
        }
      });
    } else if (this.state.formdata.password != this.state.formdata.repassword) {
      this.setState({
        alertData: {
          status: true,
          message: "Password Not Match"
        }
      });
    } else {
      this.props.createUser(this.state.formdata);
      this.props.closeHandler();
    }
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusADD
    });
  }

  render() {
    const { classes } = this.props;
    this.state.status == 200
      ? this.props.modalStatus(1, "Created!", this.state.formdata.username)
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add User</ModalHeader>
        <ModalBody>
          {/* className={classes.container} */}
          <form>
            <div class="input-group mb-4 input-group-sm">
              <label for="username" class="col-md-3">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                required
                name="username"
                value={this.state.formdata.username}
                onChange={this.changeHandler}
              />
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="password"
                value={this.state.formdata.password}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                Re Password
              </label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                name="repassword"
                value={this.state.formdata.repassword}
                onChange={this.changeHandler}
                required
              />
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="text" class="col-md-3">
                Role
              </label>
              <select
                name="m_role_id"
                value={this.state.formdata.m_role_id}
                onChange={this.changeHandler}
                required
              >
                <option value="R001">Super Administrator</option>
                <option value="R002">Administrator</option>
                <option value="R003">Employee</option>
              </select>
            </div>
            <div class="input-group mb-4 input-group-sm">
              <label for="employee" class="col-md-3">
                Employee ID
              </label>
              <input
                type="text"
                class="form-control"
                readOnly
                name="m_employee_id"
                value={this.state.formdata.m_employee_id}
                onChange={this.changeHandler}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Submit
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.useray
});

export default connect(
  mapStateToProps,
  { createUser }
)(CreateUser);
