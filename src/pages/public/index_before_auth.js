
import React from 'react';
import Chart from '../../components/Charts/chartSample';
import Header from'../../components/00-General/header';

export default () => {
    return (
        <div>
            <Header />
            <div className="evaluatz_content bg-secondary">
                <div className="evaluatz_index container shadow-lg mt-2">
                    <div className="evaluatz_index_container jumbotron jumbotron-fluid bg-secondary text-white pt-3 pb-3 mb-0 ">
                        <h1 className="display-4">Find your forecast for the stocks</h1>
                        <p className="lead">Develop your own way to predict the future values for the stocks</p>
                        <Chart />
                    </div>
                </div>
            </div>
        </div>
    );
}