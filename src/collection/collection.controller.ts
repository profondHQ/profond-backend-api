import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";

@Controller("collections")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  findAll(@Query("owner_address") owner_address?: string) {
    return this.collectionService.findAll(owner_address);
  }
}
