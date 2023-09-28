import { Controller, Get, Query } from "@nestjs/common";
import { CollectionService } from "./collection.service";

@Controller("collections")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Get()
  findAll(@Query("owner_address") owner_address?: string) {
    return this.collectionService.findAll(owner_address);
  }
}
