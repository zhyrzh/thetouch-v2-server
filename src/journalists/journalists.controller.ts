import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateJournalistDto, AddJournalistDto } from './dto';
import { JournalistsService } from './journalists.service';

@Controller('journalists')
export class JournalistsController {
  constructor(private journalistService: JournalistsService) {}
  @Get()
  getAllJournalist() {
    return this.journalistService.getAllJournalist();
  }
  @Get(':journalistId')
  getJournalist(@Param('journalistId', ParseIntPipe) journalistId: number) {
    return this.journalistService.getJournalist(journalistId);
  }
  @Post()
  addJournalist(@Body() journalistBody: AddJournalistDto) {
    return this.journalistService.addJournalist(journalistBody);
  }
  @Delete(':journalistId')
  deleteJournalist(@Param('journalistId', ParseIntPipe) journalistId: number) {
    return this.journalistService.deleteJournalist(journalistId);
  }
  @Patch(':journalistId')
  updateJournalist(
    @Param('journalistId', ParseIntPipe) journalistId: number,
    @Body() body: UpdateJournalistDto,
  ) {
    return this.journalistService.updateJournalist(journalistId, body);
  }
}
