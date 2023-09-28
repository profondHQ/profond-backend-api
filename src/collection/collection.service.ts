import { Injectable } from "@nestjs/common";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Collection } from "./schemas/collection.schema";
import { Model } from "mongoose";

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<Collection>
  ) { }

  create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const createdCollection = new this.collectionModel(createCollectionDto);
    return createdCollection.save();
  }

  findAll(owner_address?: string, chain?: string): Promise<Collection[]> {
    let matchQuery = {};
    if (owner_address) {
      matchQuery = { owner_address: owner_address };
    }

    if (chain) {
      matchQuery = { chain: chain, ...matchQuery };
    }

    return this.collectionModel.find(matchQuery).select({ _id: 0, __v: 0 });
  }
}
