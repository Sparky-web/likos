const path = require("path")

exports.onCreateNode = ({node}) => {
    console.log(`Node created of type "${node.internal.type}"`)
}


exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const result = await graphql(`
    query {
  allStrapiPage(filter: {name: {eq: "page"}}) {
    edges {
       node {
         name
           Content {
             title
             pageName
             content
          }
        }
      }
    }    
  }
  `)

    result.data.allStrapiPage.edges.forEach(({node}) => {
        createPage({
            path: node.Content[0].pageName,
            component: path.resolve(`./src/components/content-page.js`),
            context: {
                slug: node.Content[0].pageName,
            },
        })
    })
}
