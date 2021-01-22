import React from 'react';
import { connect } from 'react-redux';

import './ListTransactions.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faAsterisk } from '@fortawesome/free-solid-svg-icons'


import { formatMoney } from '../../Auxiliar';

import { getTransactions } from '../../actions/user'


class ListTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.isLoading = true;
        this.currentPage = 1;
        this.linesPerPage = 10;
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));
    }

    componentDidUpdate() {
        console.log(this.currentPage);
    }

    next() {

        this.currentPage++;
        this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));

    }

    back() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.props.dispatch(getTransactions(this.props.token, this.currentPage, this.linesPerPage));
        }
    }



    render() {
        return (
            <div className="evaluatz_list_transactions d-flex flex-column p-3 text-white">
                <div className="d-flex border-bottom">
                    <div className="col-4 p-3">Project</div>
                    <div className="col-4 p-3">Value</div>
                    <div className="col-4 p-3">Date</div>
                </div>
                <div className="evaluatz_list_transactions_content container overflow-auto">
                    {this.props.isLoadingTransactions?
                        <div className="w-100 h-100 d-flex align-items-center justify-content-around ">
                            <div className="evaluatz-logo-animated-wrapper">
                                <div className="evaluatz-logo-animated"></div>
                                <div className="evaluatz-logo-animated_E">E</div>
                                <div className="evaluatz-logo-animated_V">V</div>
                            </div>
                        </div>
                        :
                        this.props.transactions && this.props.transactions.length > 0 ?
                        this.props.transactions
                            .map((transaction, i) =>
                                <div className="row border-bottom border-secondary">
                                    <div className="col-4 p-3">{transaction.project_name}</div>
                                    <div className="col-4 p-3">{formatMoney(transaction.value)}</div>
                                    <div className="col-4 p-3">{Date.parse(transaction.timestamp)}</div>
                                </div>
                            )
                            :
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                Records Not found
                            </div>
                    }
                </div>
                <div className="d-flex w-100  justify-content-around text-white" >
                    <div onClick={this.back}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div >{this.currentPage}</div>
                    <div onClick={this.next}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

        transactions: state.user.transactions,
        isLoadingTransactions: state.user.isLoadingTransactions,
        token: state.user.token
    };
};

export default connect(mapStateToProps)(ListTransactions);