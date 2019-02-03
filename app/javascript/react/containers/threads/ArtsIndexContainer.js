import React from 'react';
import { Link } from 'react-router-dom'

import ArtContainer from './ArtContainer'

import { FetchDidMount, FetchWithUpdate } from '../../util/CoreUtil';
import { Paginator } from '../../components/Paginator'

class ArtsIndexContainer extends React.Component {
  state = {
    artsData: [],
    page: 1,
    totalResults: 0,
    rowsPerPage: 0
  }
  handleSearch = this.handleSearch.bind(this);
  getPage = this.getPage.bind(this);

  componentDidMount(){
    this.handleSearch()
  }

  handleSearch(){
    var page = this.state.page

    FetchDidMount(this, `/api/v1/arts.json?index=1&page=${page}`)
    .then(artsData => {
      this.setState({
        artsData: artsData.arts,
        totalResults: artsData.total_results,
        rowsPerPage: artsData.per_page
      })
    })
  }

  getPage(page) {
   this.setState({page: page});
   let self = this;
   setTimeout(function(){ self.handleSearch() ; }, 250);
  }


  render(){
    var formattedArts =
    this.state.artsData.map((row) => {
      var art = row.art
      return(
        <ArtContainer
          key={`art_${art.id}`}
          art={art}
        />
      )
    })

    var pagination =
      <Paginator
        totalRows={this.state.totalResults}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        getPage={this.getPage}
      />

    return(
      <div>
        {formattedArts}

        {pagination}
      </div>
    )
  }
}


export default ArtsIndexContainer;
