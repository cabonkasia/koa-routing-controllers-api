import { NotFoundError, JsonController, Get, Put, Param, Body, Post, HttpCode } from 'routing-controllers'
import Page from './entity'

// type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    @Get('/pages')
    async allPages() {
        const pages = await Page.find()
        return { pages }
    }

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ) {
        return Page.findOne(id)
    }

    @Put('/pages/:id')
    async updatePage(
        @Param('id') id: string,
        @Body() update: Partial<Page>
    ) {
        const page = await Page.findOne(parseInt(id))
        if (!page) throw new NotFoundError('Cannot find page')
        return Page.merge(page, update).save()
    }

    @Post('/pages')
    @HttpCode(201)
    createPage(
        @Body() page: Page
    ) {
        return page.save()
    }

}