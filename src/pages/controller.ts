import { JsonController, Get, Put, Param, Body, Post, HttpCode } from 'routing-controllers'
import pagesById from './entity'
import Page from './entity'

type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    @Get('/pages')
    allPages(): PageList {
      return {pages: Object.values(pagesById)}
    }

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ) {
        return Page.findOne(id)
    }

    @Put('/pages/:id')
    updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Page>
    ): Page { 
      console.log(`Incoming PUT body param:`, body)
    return pagesById[id]
    }

    @Post('/pages')
    @HttpCode(201)
    createPage(
    @Body() body: Page
    ): Page {
    console.log(`Incoming POST body param:`, body)
    return body
}

}