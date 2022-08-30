<?php

namespace App\Exports;
use App\Models\Contract;
use App\Models\Investment;
use App\Models\Properties;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Facades\Excel;

class InvestmentsExport implements FromCollection, Responsable
{
    use Exportable;
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'investments.xlsx';
    
    /**
    * Optional Writer Type
    */
    private $writerType = \Maatwebsite\Excel\Excel::XLSX;
    
    /**
    * Optional headers
    */
    private $headers = [
        'Content-Type' => 'xlsx',
    ];
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // return Investment::all();
        $user = Auth::user();
        $output=array();
        $contracts=Contract::where('investor_id', $user->id)->get();
        foreach ($contracts as $contract) { 
            $investment=Investment::where('contract_id', $contract->id)->first();
            if($investment){
                array_push( $output,[
                    "property"=>Properties::find($contract->property_id)->name,
                    "amount"=>$investment->amount,
                    "period"=>$investment->period,
                    "id"=>$investment->id,
                    "date"=>date("Y-m-d h:m:s a",strtotime($investment->created_at))
                    ]
                );
            }
            
        }
        return Collection::make($output);
    }
}
