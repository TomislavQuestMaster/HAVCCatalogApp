//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataService1
{
    using System;
    using System.Collections.Generic;
    
    public partial class Materijali
    {
        public int OID { get; set; }
        public Nullable<int> SourceOID { get; set; }
        public Nullable<int> AVDjelo { get; set; }
        public string Naziv { get; set; }
        public Nullable<int> Size { get; set; }
        public Nullable<bool> Tumbernail { get; set; }
        public string Opis { get; set; }
        public string Tip { get; set; }
        public Nullable<bool> IsSelected { get; set; }
        public Nullable<bool> HtmlExport { get; set; }
        public byte[] FileContents { get; set; }
        public System.Guid FS_RowGuid { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
    
        public virtual AVDjelo AVDjelo1 { get; set; }
    }
}
