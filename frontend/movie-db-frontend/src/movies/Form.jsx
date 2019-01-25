import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';

export class Form extends Component {
  state = {
    title: '',
    description: '',
    rating: null,
    categoryIds: [],
    file: {}
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  handleFile(e){
    this.setState({file: e.target.files[0]})
  }

  addCategory(id) {
    if (this.state.categoryIds.includes(id)) {
      const index = this.state.categoryIds.indexOf(id)
      console.log(index)
      let currentIds = this.state.categoryIds
      currentIds.splice(index, 1)
      this.setState({ categoryIds: [...currentIds] })
    } else {
      let currentIds = this.state.categoryIds
      currentIds.push(id)
      this.setState({ categoryIds: currentIds })
    }
  }
  createMovie(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('rating', this.state.rating)
    formData.append('picture', this.state.file, this.state.file.name)
    formData.append('categoryIds', this.state.categoryIds)
    Axios.post('/movies', formData)
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <div>
          {
            this.props.categories.map((category) => {
              return <label>
                {category.title}
                <input onChange={() => this.addCategory(category.id)} key={category.id} type="checkbox" value={category.id} />
              </label>
            })
          }
        </div>
        <form
          onSubmit={(e) => this.createMovie(e)}
        >
          <div>
            <label>Title</label>
            <input
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
              type="text" name="title" />
            <label>Description</label>
            <input
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
              type="text" name="description" />
            <label>Rating</label>
            <input
              value={this.state.rating}
              onChange={(e) => this.handleChange(e)}
              type="text" name="rating" />
            <label>Image</label>
            <input
              onChange={(e) => this.handleFile(e)}
              type="file" name="picture" />
          </div>
          <button
            type="submit"
          >Creer le film</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
