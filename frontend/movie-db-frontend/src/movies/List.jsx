import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCategories } from '../store/actions/categoriesActions'
import Axios from 'axios'

export class List extends Component {
  state = {
    movies: [],
    searchedMovies: []
  }
  componentDidMount() {
    Axios.get("/categories")
      .then((response) => {
        this.props.fetchCategories(response.data)
      })
      .catch((error) => console.log(error))
  }

  addMovies(movies) {
    this.setState({ movies })
  }

  findMovie(e) {
    if (e.target.value.length > 0) {
      Axios.post('/movies/find-by-name', { title: e.target.value })
        .then((response) => {
          console.log(response.data)
          if (response.data.movies.length > 0) {
            this.setState({ searchedMovies: response.data.movies })
          }
        })
        .catch((error) => console.log(error))
    } else {
      this.setState({ searchedMovies: [] })
    }
  }

  render() {
    console.log("FROM STATE", this.state)
    return (
      <div>
        <ul>
          {
            this.props.categories.map((category) => {
              return <li
                onClick={(e) => this.addMovies(category.movies)}
                key={category.id}>
                {category.title}
              </li>
            })
          }
        </ul>
        <NavLink to="/create">Ajouter un film</NavLink>
        <div>
          <h3>Movies list</h3>
          {
            this.state.movies.map((movie) => {
              return (
                <div style={{ backgroundImage: `url(${movie.picture})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                  <h5>{movie.title}</h5>
                  <p>Description : {movie.description}</p>
                  <p>Note : {movie.rating}</p>
                </div>
              )
            })
          }
        </div>
        <div>
          <h3>Search Movies</h3>
          <input type="text" name="movieTitle" onChange={(e) => this.findMovie(e)} />
          <ul>
            {
              this.state.searchedMovies.map((movie) => {
                return <li key={movie.id}>{movie.title}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
