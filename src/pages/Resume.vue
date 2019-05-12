<script>
export default {
  
}
</script>

<template>
  <div class="resume">
    <div class="personal-info">
      <h1 class="personal-info__name title">
        Shannon Archer
      </h1>
      <h2 class="personal-info__title subtitle">
        Senior Software Developer
      </h2>
    </div>

    <div class="contact-info">
      <ul>
        <li><a href="mailto:shannon@shannonarcher.me">shannon@shannonarcher.me</a></li>
        <li><a href="https://github.com/shannonarcher">github.com/shannonarcher</a></li>
        <li><a href="http://shannonarcher.me">shannonarcher.me</a></li>
        <li><a href="tel:3123699517">(312) 369-9517</a></li>
      </ul>
    </div>

    <div class="summary">

    </div>

    <div class="experience">
      <h1>Experience</h1>
      <h2>Senior Frontend Developer</h2>
      <h3>Zoro</h3>
      <h3>04/2019 - present</h3>
      <ul>
        <li>I am critical in the current incremental refactor of our ecommerce front-end into a modern web application built in Vue with a focus on speed, reliability and SEO value.</li>
        <li>I am working extensively with UI/UX, product owners, data analysts and other teams to deliver a quality user experience and improve conversion across the site.</li>
        <li>I dedicate considerable focus on the mentorship and leadership of developers located within and outside of the team I am technical lead for.</li>
        <li>I am involved in the continued introduction of robust work processes for version control, documentation, peer review, communities of practice etc as the IT department grows.</li>
      </ul>

      <h2>IT Developer</h2>
      <h3>Zoro</h3>
      <h3>01/2018 - 04/2010</h3>
      <ul>
        <li>I supported the technical lead by taking on major technical refactors and mentoring of other developers on the team.</li>
        <li>I lead the implementation of a Vue SPA for the site’s checkout experience, completing the major foundational work necessary to meet the requirements of a large ecommerce company’s product and development flow through SSR, webpack, Vuex, vue-test-utils and advanced component design.</li>
        <li>I developed and executed the technical interview process for front-end candidates during an extensive hiring initiative.</li>
        <li>I championed unit testing of Vue quickly becoming the subject matter expert and presenting multiple training sessions for the department.</li>
      </ul>

      <h2>Software Developer</h2>
      <h3>Coates Group</h3>
      <h3>11/2015 - 01/2018</h3>
      <ul>
        <li>I focused on an Angular 1.x content management system that worked with a proprietary delivery network for managing html5 content run on in-store digital hardware for quick-service restaurants.</li>
        <li>I worked with designers and product owners in the creation of process and technology for optimising the development of html5 content through tools such as gulp, project generators, and an evolving component library powered by Vue.</li>
      </ul>

      <h2>Freelancer</h2>
      <h3>Self</h3>
      <h3>01/2014 - 01/2016</h3>
      <ul>
        <li>I started a business which began as simple PSD - HTML builds and evolved into small-scale cms-backed web applications.</li>
        <li>Responsibilities involved acquiring business, talking to clients, requirements gathering, working with various other stakeholders and development, deployment and management of projects.</li>
      </ul>
    </div>

    <div class="education">
      <h1>Education</h1>
      <h2>Bachelor of Computer Science</h2>
      <h3>University of Wollongong</h3>
      <h3>2011 - 2015</h3>
    </div>
  </div>
</template>

<style lang="sass">
@import '../styles/global.sass'

$gray: #999

@media print
  .resume
    border: none !important
    margin-top: 0

  .app__header, .app__footer
    display: none

.resume
  display: grid
  grid-template-areas: "personal contact" "sum sum" "xp xp" "edu edu"
  text-align: left
  margin: 30px 0
  padding: 30px
  background: #fff
  border: solid 1px #ccc
  
  @include respond-to('large')
    margin: 30px 120px

  .title
    font-size: 4em
    margin-bottom: 0

  .subtitle
    font-size: 2em
    margin: 0
    color: $gray

  h1:not(.title)
    font-size: 3em
    padding-bottom: 0.67em
    border-bottom: solid 1px $gray

  h2
    font-size: 2em

  h3
    font-size: 1.4em
    margin: 0

  ul
    font-size: 1.5em
    line-height: 1.8em

  .personal-info
    grid-area: personal
    padding: 15px 0

  .contact-info
    grid-area: contact
    justify-self: end
    align-content: end
    text-align: right
    padding-top: 0.67em
    display: flex
    flex-direction: column
    justify-content: flex-end
    padding: 15px 0

    ul 
      list-style: none
      font-size: 1.5em
      margin: 0
      padding: 0
    
  .summary
    grid-area: sum
    border-top: #000 solid 1px

  .experience
    grid-area: xp

  .education
    grid-area: edu

</style>