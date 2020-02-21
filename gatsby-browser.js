/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// AWS
import Amplify from "aws-amplify"
import config from "./src/aws-exports"

// Styles
import "./src/styles/site.css"
import "./src/layouts/layout.css"
import "lazysizes"


Amplify.configure(config)