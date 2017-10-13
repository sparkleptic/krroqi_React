import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, ButtonText } from './../common/commonStyle';
import RowButton from './../inputControls/rowButton';

class filterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
    };
    this.onSelectValue = this.onSelectValue.bind(this);
  }

  onSelectValue(e, value) {
    alert(value);
  }

  render() {
    return (
      <Container>
        <RowButton value="Any" options={['Any', '1+', '2+']} onChange={this.onSelectValue} />
      </Container>
    );
  }
}

filterPage.propTypes = {
  search: PropTypes.object.isRequired,
};

export default filterPage;
