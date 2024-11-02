import { Component } from 'react';
import './StoreTable.css';

export class StoreTable extends Component {

    static displayName = StoreTable.name;

    constructor(props) {
        super(props);
        this.state = { stores: [], loading: true };
        //this.addStores = this.addCustomer.bind(this);
    }

    componentDidMount() {
        this.populateStoresData();
    }


    static renderStoresTable(stores) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr >
                        <th className="header">Id</th>
                        <th className="header">Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store =>
                        <tr key={store.id}>
                            <td className="record" >{store.id}</td>
                            <td className="record"  >{store.name}</td>
                            <td ><button>Update Store</button></td>
                            <td><button>Delete Store</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : StoreTable.renderStoresTable(this.state.stores);

        return (
            <div>
                <input id="storeName" name="storeName"
                    type="text"
                    placeholder="Store Name"                                      
                />
                <button onClick={this.addStores}>Add Store</button>
                <h1 id="tableLabel">Stores</h1>
                {contents}
            </div>
        );
    }

    async addStores() {

        let sName = document.getElementById('storeName').value;

        console.log(sName);
       
        const data = await fetch(
            'stores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                name: sName
            })
        }).then((data) => data.json());

        console.log(data); 

        this.populateStoresData();
    }



    async populateStoresData() {
        const response = await fetch('stores');
        const data = await response.json();
        this.setState({ stores: data, loading: false });
    }
}