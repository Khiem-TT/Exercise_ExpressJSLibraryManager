import {Schema, model} from "mongoose";

interface IPublishingHouseSchema {
    name: string;
}

const publishingHouseSchema = new Schema<IPublishingHouseSchema>({
    name: String
});

const PublishingHouse = model<IPublishingHouseSchema>('PublishingHouse', publishingHouseSchema);

export {PublishingHouse};