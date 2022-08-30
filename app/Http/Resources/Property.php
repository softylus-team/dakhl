<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Property extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    { 
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'type'          => $this->type,
            'bedrooms'      => (int) $this->bedrooms,
            'status'        => $this->status,
            'nighborhood'   => $this->nighborhood,
            'bulding_name'  => $this->bulding_name,
            'community_name'=> $this->community_name,
            'description'   => $this->description,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}
